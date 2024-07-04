import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function isCloseToWhite(hexColor, threshold = 40) {
  const whiteLab = [100, 0, 0]; // CIELAB coordinates for white
  const hexToLab = hex => {
    const rgb = hexToRgb(hex);
    const xyz = rgbToXyz(rgb);
    return xyzToLab(xyz);
    };
    
    const labColor = hexToLab(extractHexFromTailwindClass(hexColor));
    const deltaE = colorDistance(labColor, whiteLab);
    // console.log(deltaE, labColor, whiteLab)

  return deltaE <= threshold;
}

function extractHexFromTailwindClass(className) {
  const hexRegex = /\[#([A-Fa-f0-9]{6})\]/;
  const match = className.match(hexRegex);
  return match? `#${match[1]}` : null;
}

// Helper functions
function hexToRgb(hex) {
  const r = parseInt(hex.substr(1, 2), 16) / 255;
  const g = parseInt(hex.substr(3, 2), 16) / 255;
  const b = parseInt(hex.substr(5, 2), 16) / 255;
  return [r, g, b];
}

function rgbToXyz(rgb) {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  const x = 0.412453 * r + 0.357580 * g + 0.180423 * b;
  const y = 0.212671 * r + 0.715160 * g + 0.072169 * b;
  const z = 0.019334 * r + 0.119193 * g + 0.950227 * b;
  return [x, y, z];
}

function xyzToLab(xyz) {
  const x = xyz[0];
  const y = xyz[1];
  const z = xyz[2];
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b];
}

function colorDistance(lab1, lab2) {
  const deltaL = lab1[0] - lab2[0];
  const deltaA = lab1[1] - lab2[1];
  const deltaB = lab1[2] - lab2[2];
  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
}

export async function deleteApi(id, resetForm) {
  
  try {
      const response = await fetch(`http://135.181.57.251:3048/api/Controls/DeleteControl?controlId=${id}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Request-Id': 'bf0256a6-9507-4b32-808a-30efbc9ab14d'
          }
      });

      const data = await response.json();
      resetForm();
      console.log(data);
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error("Unable to perform task");
  }
}