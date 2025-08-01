"use client";
import React, { useState, useEffect } from "react";

interface BrixBarProps {
  value: number;
  threshold: number;
  maxBrix: number;
  label: string;
  barHeight: number;
}

export default function BrixBar({
  value,
  threshold,
  maxBrix,
  label,
  barHeight,
}: BrixBarProps) {
  const [currentValue, setCurrentValue] = useState(0);

  // Animate values on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const startValue = 0;
    const targetValue = value;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Spring animation with easing
      const springProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal =
        startValue + (targetValue - startValue) * springProgress;

      setCurrentValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value]);

  // Calculate positions
  const getPosition = (value: number) => {
    return Math.min((value / maxBrix) * 100, 100);
  };

  const position = Math.max(0, Math.min(100, getPosition(currentValue)));

  // Get color for each segment based on Brix value and maxBrix
  const getSegmentColor = (brixValue: number) => {
    // Calculate color based on percentage of maxBrix
    const percentage = (brixValue / maxBrix) * 100;

    // Dynamic color generation based on percentage
    // Create a smooth gradient from red to green
    if (percentage >= 80) {
      return "#22c55e"; // Green for excellent (80-100% of max)
    } else if (percentage >= 70) {
      return "#4ade80"; // Light green for very good (70-79% of max)
    } else if (percentage >= 60) {
      return "#84cc16"; // Lime green for good (60-69% of max)
    } else if (percentage >= 50) {
      return "#eab308"; // Yellow for fair (50-59% of max)
    } else if (percentage >= 40) {
      return "#f59e0b"; // Amber for below average (40-49% of max)
    } else if (percentage >= 30) {
      return "#f97316"; // Orange for poor (30-39% of max)
    } else if (percentage >= 20) {
      return "#ea580c"; // Dark orange for very poor (20-29% of max)
    } else if (percentage >= 10) {
      return "#dc2626"; // Red for very poor (10-19% of max)
    } else {
      return "#991b1b"; // Dark red for extremely poor (0-9% of max)
    }
  };

  // Determine status and color for the current value
  const getStatus = () => {
    if (currentValue >= threshold) {
      return {
        text: "Excellent",
        color: "text-green-600",
        bgColor: "bg-green-500",
      };
    } else if (currentValue >= threshold * 0.8) {
      return {
        text: "Good",
        color: "text-yellow-600",
        bgColor: "bg-yellow-500",
      };
    } else if (currentValue >= threshold * 0.6) {
      return {
        text: "Fair",
        color: "text-orange-600",
        bgColor: "bg-orange-500",
      };
    } else {
      return { text: "Poor", color: "text-red-600", bgColor: "bg-red-500" };
    }
  };

  const status = getStatus();

  return (
    <div className="flex items-center">
      <div className="relative drop-shadow-sm w-full">
        {/* Threshold indicator */}
        {/* <div
          className="absolute top-4 text-xs font-medium text-gray-600"
          style={{
            left: `${thresholdPosition}%`,
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <div className="text-center mt-1">{threshold}</div>
          <div className="text-center w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-gray-600 mx-auto"></div>
        </div> */}

        {/* Value indicator */}
        <div
          className="absolute -top-10 text-lg font-medium text-gray-800"
          style={{
            left: `${position}%`,
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <div className="text-center mt-1">{currentValue.toFixed(1)}</div>
          <div className="text-center w-0 h-0 border-l-12 border-r-12 border-t-16 border-transparent border-t-gray-600 mx-auto"></div>
        </div>

        {/* Bar container */}
        <div
          className="relative bg-gray-200 rounded-full shadow-md"
          style={{ height: barHeight }}
        >
          {/* Segmented background */}
          {Array.from({ length: Math.ceil(maxBrix / 2) }, (_, i) => {
            const segmentStart = i * 2; // Every 2 Brix units
            const segmentMidpoint = segmentStart + 1; // Use midpoint for color
            const color = getSegmentColor(segmentMidpoint);
            const left = (segmentStart / maxBrix) * 100;
            const width = (2 / maxBrix) * 100; // 2 Brix units width

            return (
              <div
                key={i}
                className="absolute h-full"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  backgroundColor: color,
                }}
              />
            );
          })}

          {/* Value indicator line */}
          <div
            className={`absolute top-0 bottom-0 w-1 ${status.bgColor} rounded-full`}
            style={{
              left: `${position}%`,
              transform: "translateX(-50%)",
            }}
          />
        </div>

        {/* Scale markers */}
        <div className="absolute top-8 inset-0 flex justify-between items-center px-2">
          {(() => {
            const markers = [];
            // Always show 0
            markers.push(0);

            // Show intermediate markers every 4 units
            for (let i = 4; i < maxBrix; i += 4) {
              markers.push(i);
            }

            // Always show the max value
            if (maxBrix > 0) {
              markers.push(maxBrix);
            }

            return markers.map((mark) => (
              <div
                key={mark}
                className="text-xs text-gray-600"
                style={{
                  left: `${(mark / maxBrix) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {mark}
              </div>
            ));
          })()}
        </div>
      </div>

      {/* Value display */}
      <div className="text-center pl-4 min-w-[120px]">
        <div className="text-md text-gray-600">{label}</div>
        <div className="text-2xl font-bold text-gray-800">
          {currentValue.toFixed(1)}%
        </div>
        <div className={`text-xs font-medium ${status.color}`}>
          {status.text}
        </div>
        <div className="text-xs text-gray-500">Target: ≥{threshold}</div>
      </div>
    </div>
  );
}
