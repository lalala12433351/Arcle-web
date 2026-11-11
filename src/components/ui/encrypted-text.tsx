"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
  text: string;
  className?: string;
  /**
   * Time in milliseconds between revealing each subsequent real character.
   * Lower is faster. Defaults to 50ms per character.
   */
  revealDelayMs?: number;
  /** Optional custom character set to use for the gibberish effect. */
  charset?: string;
  /**
   * Time in milliseconds between gibberish flips for unrevealed characters.
   * Lower is more jittery. Defaults to 50ms.
   */
  flipDelayMs?: number;
  /** CSS class for styling the encrypted/scrambled characters */
  encryptedClassName?: string;
  /** CSS class for styling the revealed characters */
  revealedClassName?: string;
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
  const index = Math.floor(Math.random() * charset.length);
  return charset.charAt(index);
}

function generateGibberishPreservingSpaces(
  original: string,
  charset: string,
): string {
  if (!original) return "";
  let result = "";
  for (let i = 0; i < original.length; i += 1) {
    const ch = original[i];
    result += ch === " " ? " " : generateRandomCharacter(charset);
  }
  return result;
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [revealed, setRevealed] = useState(false);
  const scrambleCharsRef = useRef<string[]>(
    text ? generateGibberishPreservingSpaces(text, charset).split("") : [],
  );

  useEffect(() => {
    if (!isInView || !text) return;
    const root = ref.current;
    if (!root) return;

    scrambleCharsRef.current = generateGibberishPreservingSpaces(text, charset).split("");
    setRevealed(false);

    const encryptedClass = cn(encryptedClassName);
    const revealedClass = cn(revealedClassName);
    const start = performance.now();
    let lastFlip = start;
    let frame = 0;
    let cancelled = false;

    const paint = (count: number) => {
      const nodes = root.querySelectorAll<HTMLSpanElement>("[data-enc-char]");
      for (let index = 0; index < text.length; index += 1) {
        const node = nodes[index];
        if (!node) continue;
        const ch = text[index];
        const isRevealed = index < count;
        const display = isRevealed || ch === " " ? ch : scrambleCharsRef.current[index];
        if (node.textContent !== display) node.textContent = display;
        const nextClass = isRevealed ? revealedClass : encryptedClass;
        if (node.className !== nextClass) node.className = nextClass;
      }
    };

    paint(0);

    const update = (now: number) => {
      if (cancelled) return;

      const elapsedMs = now - start;
      const currentRevealCount = Math.min(
        text.length,
        Math.floor(elapsedMs / Math.max(1, revealDelayMs)),
      );

      if (currentRevealCount < text.length) {
        const timeSinceLastFlip = now - lastFlip;
        if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
          for (let index = currentRevealCount; index < text.length; index += 1) {
            scrambleCharsRef.current[index] =
              text[index] === " " ? " " : generateRandomCharacter(charset);
          }
          lastFlip = now;
        }
      }

      paint(currentRevealCount);

      if (currentRevealCount >= text.length) {
        setRevealed(true);
        return;
      }

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [isInView, text, revealDelayMs, charset, flipDelayMs, encryptedClassName, revealedClassName]);

  if (!text) return null;

  const encryptedClass = cn(encryptedClassName);
  const revealedClass = cn(revealedClassName);

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      aria-label={text}
      role="text"
    >
      {text.split("").map((char, index) => {
        const displayChar = revealed
          ? char
          : char === " "
            ? " "
            : (scrambleCharsRef.current[index] ?? generateRandomCharacter(charset));

        return (
          <span
            key={index}
            data-enc-char=""
            className={revealed ? revealedClass : encryptedClass}
          >
            {displayChar}
          </span>
        );
      })}
    </motion.span>
  );
};
