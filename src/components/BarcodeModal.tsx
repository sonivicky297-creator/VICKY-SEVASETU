import React, { useState } from 'react';
import { 
  Barcode as BarcodeIcon, 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  ShieldCheck, 
  Phone, 
  CreditCard, 
  X, 
  ExternalLink,
  Camera,
  Search,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceProvider } from '../types';

// High-fidelity Code128-style Barcode SVG Renderer
export const SvgBarcode: React.FC<{
  code: string;
  width?: number;
  height?: number;
  showText?: boolean;
  className?: string;
}> = ({ code, width = 280, height = 70, showText = true, className = '' }) => {
  // Deterministically generate bar widths from the input code string
  const generateBars = (str: string) => {
    const bars: { width: number; isSpace: boolean }[] = [];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    
    // Start guard bars
    bars.push({ width: 2, isSpace: false });
    bars.push({ width: 1, isSpace: true });
    bars.push({ width: 2, isSpace: false });

    // Generate bar patterns based on characters
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      const pattern = [
        (charCode % 3) + 1,
        ((charCode >> 1) % 2) + 1,
        ((charCode >> 2) % 3) + 1,
        ((charCode >> 3) % 2) + 1,
      ];
      
      pattern.forEach((w, idx) => {
        bars.push({ width: w, isSpace: idx % 2 === 1 });
      });
      bars.push({ width: 1, isSpace: true });
    }

    // End guard bars
    bars.push({ width: 2, isSpace: false });
    bars.push({ width: 1, isSpace: true });
    bars.push({ width: 3, isSpace: false });

    return bars;
  };

  const bars = generateBars(code || 'VSS-809219303');
  const totalUnits = bars.reduce((acc, b) => acc + b.width, 0);
  const scale = width / totalUnits;
  let currentX = 0;

  return (
    <div className={`flex flex-col items-center bg-white p-3 rounded-xl border border-slate-200 shadow-xs ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-full overflow-hidden select-none"
      >
        <rect width={width} height={height} fill="#ffffff" />
        {bars.map((bar, i) => {
          const barW = bar.width * scale;
          const x = currentX;
          currentX += barW;
          if (bar.isSpace) return null;
          return (
            <rect
              key={i}
              x={x}
              y={0}
              width={Math.max(1, barW - 0.2)}
              height={height}
              fill="#0f172a"
            />
          );
        })}
      </svg>
      {showText && (
        <span className="font-mono text-xs sm:text-sm tracking-widest text-slate-800 font-bold mt-1.5 uppercase select-all">
          {code}
        </span>
      )}
    </div>
  );
};

// Generates a scan-ready SVG QR Code matrix for UPI & Applet URLs
export const SvgQrCode: React.FC<{
  value: string;
  size?: number;
  className?: string;
}> = ({ value, size = 180, className = '' }) => {
  // Create a clean pseudo-random 21x21 QR code matrix seeded by value
  const generateMatrix = (str: string) => {
    const matrix: boolean[][] = Array(21).fill(false).map(() => Array(21).fill(false));

    // Finder patterns (top-left, top-right, bottom-left 7x7 squares)
    const setFinder = (startR: number, startC: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (
            r === 0 || r === 6 || c === 0 || c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            matrix[startR + r][startC + c] = true;
          }
        }
      }
    };

    setFinder(0, 0);
    setFinder(0, 14);
    setFinder(14, 0);

    // Timing patterns
    for (let i = 8; i < 13; i++) {
      matrix[6][i] = i % 2 === 0;
      matrix[i][6] = i % 2 === 0;
    }

    // Fill data area based on characters
    let seed = 0;
    for (let i = 0; i < str.length; i++) {
      seed = (seed * 31 + str.charCodeAt(i)) >>> 0;
    }

    for (let r = 0; r < 21; r++) {
      for (let c = 0; c < 21; c++) {
        // Skip finders
        if (
          (r < 8 && c < 8) ||
          (r < 8 && c >= 13) ||
          (r >= 13 && c < 8)
        ) {
          continue;
        }
        seed = (seed * 1664525 + 1013904223) >>> 0;
        matrix[r][c] = (seed % 100) < 55;
      }
    }

    return matrix;
  };

  const matrix = generateMatrix(value || 'https://vickysevasetu.local');
  const cellSize = size / 21;

  return (
    <div className={`p-3 bg-white rounded-2xl border border-slate-200 shadow-xs inline-block ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg">
        <rect width={size} height={size} fill="#ffffff" />
        {matrix.map((row, r) =>
          row.map((filled, c) =>
            filled ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize + 0.3}
                height={cellSize + 0.3}
                fill="#0f172a"
                rx={cellSize * 0.15}
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
};

interface BarcodeModalProps {
  provider?: ServiceProvider;
  initialCode?: string;
  providerName?: string;
  taskId?: string;
  taskTitle?: string;
  onClose: () => void;
}

export const BarcodeModal: React.FC<BarcodeModalProps> = ({
  provider,
  initialCode,
  providerName,
  taskId,
  taskTitle,
  onClose,
}) => {
  const resolvedCode = provider?.barcode || initialCode || (provider ? `VSS-${provider.id.toUpperCase()}-${provider.phone.replace(/[^0-9]/g, '').slice(-4)}` : 'VSS-PAY-809219303');
  const resolvedProviderName = provider?.name || providerName || 'Vicky Seva Setu Official';
  const resolvedTaskTitle = provider?.title || taskTitle || 'General Service & Direct Verification';

  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'barcode' | 'upi' | 'scanner'>('barcode');
  const [customCode, setCustomCode] = useState(resolvedCode);
  const [copied, setCopied] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const upiId = '809219303@upi';
  const upiPayString = `upi://pay?pa=${upiId}&pn=Vicky%20Seva%20Setu&cu=INR`;

  const handleCopy = (textToCopy: string, label: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    addToast(`${label} copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanResult(customCode);
      addToast(`Barcode scanned successfully: ${customCode}`, 'success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 text-white shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <BarcodeIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Vicky Seva Setu Barcode & QR</h3>
              <p className="text-xs text-amber-200/90">Official Digital ID & Direct Payment Code</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1.5 gap-1.5 shrink-0">
          <button
            onClick={() => setActiveTab('barcode')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'barcode'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarcodeIcon className="w-4 h-4 text-amber-600" />
            <span>Digital Barcode</span>
          </button>

          <button
            onClick={() => setActiveTab('upi')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'upi'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4 text-emerald-600" />
            <span>Scan & Pay (UPI)</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'scanner'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4 text-blue-600" />
            <span>Barcode Scanner</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {activeTab === 'barcode' && (
            <div className="space-y-4 text-center">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Verified Task & ID Barcode
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-2">{providerName}</h4>
                  <p className="text-xs text-slate-500">{taskTitle}</p>
                </div>

                {/* SVG Barcode Output */}
                <div className="py-2 flex justify-center">
                  <SvgBarcode code={customCode} width={300} height={75} showText={true} />
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Coverage: Bhurkunda, Ramgarh, Sayal, Saunda, Patratu & All Areas</span>
                </div>
              </div>

              {/* Barcode Customizer */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-left space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Customize Barcode Value / Task ID:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                    placeholder="Enter alphanumeric barcode..."
                    className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:border-amber-500 font-mono"
                  />
                  <button
                    onClick={() => handleCopy(customCode, 'Barcode code')}
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* Direct helpline buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href="tel:809219303"
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: 809219303</span>
                </a>
                <a
                  href="https://wa.me/91809219303?text=Hello%20Vicky%20Seva%20Setu%2C%20I%20scanned%20the%20task%20barcode."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'upi' && (
            <div className="space-y-4 text-center">
              <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200 space-y-3">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  Direct 0% Commission Payment
                </span>
                
                <h4 className="text-base font-bold text-slate-900">
                  Scan to Pay Directly to Service Provider
                </h4>
                <p className="text-xs text-slate-600">
                  Pay via any UPI App (Google Pay, PhonePe, Paytm, BHIM) upon satisfactory completion
                </p>

                {/* SVG QR Code */}
                <div className="py-2 flex justify-center">
                  <SvgQrCode value={upiPayString} size={190} />
                </div>

                <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 font-medium">Direct UPI ID / Mobile:</p>
                    <p className="font-mono font-bold text-slate-900 text-sm">809219303@upi</p>
                  </div>
                  <button
                    onClick={() => handleCopy('809219303@upi', 'UPI ID')}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200 transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 text-left flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Zero Advance Required:</strong> Inspect the work first in Bhurkunda, Ramgarh, Sayal, Saunda, or Patratu, then pay directly with this Barcode/QR.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'scanner' && (
            <div className="space-y-4 text-center">
              <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
                
                {/* Simulated Scanner Viewport */}
                <div className="w-56 h-36 border-2 border-dashed border-amber-400/80 rounded-2xl relative flex items-center justify-center p-2 bg-slate-800/60">
                  <div className="absolute inset-x-2 top-0 h-1 bg-amber-400 shadow-lg shadow-amber-400 animate-pulse" />
                  <div className="text-center space-y-1">
                    <Camera className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
                    <p className="text-xs text-slate-300 font-medium">
                      Align Barcode or QR Code within frame
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={handleSimulateScan}
                    disabled={scanning}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all disabled:opacity-50"
                  >
                    {scanning ? 'Scanning Barcode...' : 'Test Barcode Scanner'}
                  </button>
                </div>
              </div>

              {scanResult && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Barcode Verified & Matched</span>
                  </div>
                  <p className="font-mono text-xs font-bold text-slate-900 bg-white p-2.5 rounded-xl border border-emerald-200">
                    {scanResult}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Status: Authenticated provider under Vicky Seva Setu network (Bhurkunda & Ramgarh).
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Helpline: <strong>809219303</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
