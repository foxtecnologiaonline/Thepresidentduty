import { useState } from "react";
import { INDICATOR_META, INDICATOR_ORDER } from "../data/indicators";
import type { Indicators } from "../types";

interface Props {
  snapshots: Indicators[];
}

const WIDTH = 640;
const HEIGHT = 200;
const PAD_LEFT = 28;
const PAD_RIGHT = 8;
const PAD_TOP = 10;
const PAD_BOTTOM = 10;

const PLOT_W = WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_H = HEIGHT - PAD_TOP - PAD_BOTTOM;

function xFor(index: number, count: number): number {
  if (count <= 1) return PAD_LEFT;
  return PAD_LEFT + (index / (count - 1)) * PLOT_W;
}

function yFor(value: number): number {
  return PAD_TOP + (1 - value / 100) * PLOT_H;
}

export function TrajectoryChart({ snapshots }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const count = snapshots.length;
  if (count < 2) return null;

  const gridValues = [0, 50, 100];
  const activeIndex = hoverIndex ?? count - 1;
  const activeSnapshot = snapshots[activeIndex];

  function handleMove(event: React.MouseEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = ((event.clientX - rect.left) / rect.width) * WIDTH;
    const ratio = Math.max(0, Math.min(1, (relX - PAD_LEFT) / PLOT_W));
    setHoverIndex(Math.round(ratio * (count - 1)));
  }

  return (
    <div className="trajectory-chart">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="trajectory-svg"
        role="img"
        aria-label="Trajetória dos indicadores ao longo do reinado"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {gridValues.map((value) => (
          <g key={value}>
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={yFor(value)}
              y2={yFor(value)}
              className="trajectory-grid"
            />
            <text x={2} y={yFor(value) + 3} className="trajectory-axis-label">
              {value}
            </text>
          </g>
        ))}

        {hoverIndex !== null && (
          <line
            x1={xFor(hoverIndex, count)}
            x2={xFor(hoverIndex, count)}
            y1={PAD_TOP}
            y2={HEIGHT - PAD_BOTTOM}
            className="trajectory-crosshair"
          />
        )}

        {INDICATOR_ORDER.map((key) => {
          const points = snapshots.map((snap, i) => `${xFor(i, count)},${yFor(snap[key])}`).join(" ");
          return (
            <polyline
              key={key}
              points={points}
              fill="none"
              stroke={INDICATOR_META[key].chartColor}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
      </svg>

      <div className="trajectory-readout">
        <span className="trajectory-readout-turn">
          {hoverIndex === null ? "Final do reinado" : hoverIndex === 0 ? "Início do reinado" : `Ano ${hoverIndex}`}
        </span>
        <div className="trajectory-readout-values">
          {INDICATOR_ORDER.map((key) => (
            <span key={key} className="trajectory-readout-item">
              <span className="trajectory-dot" style={{ background: INDICATOR_META[key].chartColor }} />
              {Math.round(activeSnapshot[key])}
            </span>
          ))}
        </div>
      </div>

      <div className="trajectory-legend">
        {INDICATOR_ORDER.map((key) => (
          <span key={key} className="trajectory-legend-item">
            <span className="trajectory-dot" style={{ background: INDICATOR_META[key].chartColor }} />
            {INDICATOR_META[key].label}
          </span>
        ))}
      </div>
    </div>
  );
}
