"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Gamepad2, RotateCcw } from "lucide-react";
import { fadeInUp } from "@/lib/utils";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 150;
const GROUND_Y = 120;
const DINO_WIDTH = 40;
const DINO_HEIGHT = 44;
const CACTUS_WIDTH = 20;
const CACTUS_HEIGHT = 40;
const GRAVITY = 0.6;
const JUMP_FORCE = -12;

export function DinoGame() {
    const ref = useRef(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const gameRef = useRef({
        dinoY: GROUND_Y - DINO_HEIGHT,
        dinoVelocity: 0,
        isJumping: false,
        cacti: [] as { x: number; width: number; height: number }[],
        frameCount: 0,
        speed: 5,
        score: 0,
    });

    const resetGame = useCallback(() => {
        gameRef.current = {
            dinoY: GROUND_Y - DINO_HEIGHT,
            dinoVelocity: 0,
            isJumping: false,
            cacti: [],
            frameCount: 0,
            speed: 5,
            score: 0,
        };
        setScore(0);
    }, []);

    const startGame = useCallback(() => {
        resetGame();
        setGameState("playing");
    }, [resetGame]);

    const jump = useCallback(() => {
        if (gameState === "idle") {
            startGame();
            return;
        }
        if (gameState === "over") {
            startGame();
            return;
        }
        if (!gameRef.current.isJumping) {
            gameRef.current.dinoVelocity = JUMP_FORCE;
            gameRef.current.isJumping = true;
        }
    }, [gameState, startGame]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space" || e.code === "ArrowUp") {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [jump]);

    useEffect(() => {
        if (gameState !== "playing") return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        const gameLoop = () => {
            const game = gameRef.current;

            // Clear canvas
            ctx.fillStyle = "#171717";
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            // Draw ground
            ctx.strokeStyle = "#404040";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, GROUND_Y);
            ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
            ctx.stroke();

            // Update dino
            game.dinoVelocity += GRAVITY;
            game.dinoY += game.dinoVelocity;

            if (game.dinoY >= GROUND_Y - DINO_HEIGHT) {
                game.dinoY = GROUND_Y - DINO_HEIGHT;
                game.dinoVelocity = 0;
                game.isJumping = false;
            }

            // Draw dino (simple T-Rex shape)
            ctx.fillStyle = "#a3a3a3";
            // Body
            ctx.fillRect(20, game.dinoY + 10, 25, 25);
            // Head
            ctx.fillRect(35, game.dinoY, 20, 15);
            // Eye
            ctx.fillStyle = "#171717";
            ctx.fillRect(48, game.dinoY + 4, 4, 4);
            // Legs
            ctx.fillStyle = "#a3a3a3";
            const legOffset = game.frameCount % 20 < 10 ? 0 : 5;
            ctx.fillRect(25, game.dinoY + 35, 6, 9 + legOffset);
            ctx.fillRect(35, game.dinoY + 35, 6, 9 - legOffset);
            // Tail
            ctx.fillRect(10, game.dinoY + 15, 15, 8);

            // Spawn cacti
            game.frameCount++;
            if (game.frameCount % Math.max(60, 100 - game.score / 5) === 0) {
                game.cacti.push({
                    x: CANVAS_WIDTH,
                    width: CACTUS_WIDTH + Math.random() * 10,
                    height: CACTUS_HEIGHT + Math.random() * 15,
                });
            }

            // Update and draw cacti
            game.cacti = game.cacti.filter((c) => c.x > -c.width);
            game.cacti.forEach((cactus) => {
                cactus.x -= game.speed;

                // Draw cactus
                ctx.fillStyle = "#22c55e";
                ctx.fillRect(cactus.x, GROUND_Y - cactus.height, cactus.width, cactus.height);
                // Cactus arms
                ctx.fillRect(cactus.x - 5, GROUND_Y - cactus.height + 10, 8, 15);
                ctx.fillRect(cactus.x + cactus.width - 3, GROUND_Y - cactus.height + 15, 8, 12);

                // Collision detection
                const dinoRect = {
                    x: 20,
                    y: game.dinoY,
                    width: DINO_WIDTH - 5,
                    height: DINO_HEIGHT,
                };
                const cactusRect = {
                    x: cactus.x,
                    y: GROUND_Y - cactus.height,
                    width: cactus.width,
                    height: cactus.height,
                };

                if (
                    dinoRect.x < cactusRect.x + cactusRect.width &&
                    dinoRect.x + dinoRect.width > cactusRect.x &&
                    dinoRect.y < cactusRect.y + cactusRect.height &&
                    dinoRect.y + dinoRect.height > cactusRect.y
                ) {
                    setGameState("over");
                    setHighScore((prev) => Math.max(prev, game.score));
                    return;
                }
            });

            // Update score
            if (game.frameCount % 5 === 0) {
                game.score++;
                setScore(game.score);
            }

            // Increase speed
            game.speed = 5 + game.score / 100;

            // Draw score
            ctx.fillStyle = "#737373";
            ctx.font = "16px monospace";
            ctx.textAlign = "right";
            ctx.fillText(`HI ${String(highScore).padStart(5, "0")}  ${String(game.score).padStart(5, "0")}`, CANVAS_WIDTH - 10, 25);

            animationId = requestAnimationFrame(gameLoop);
        };

        animationId = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(animationId);
    }, [gameState, highScore]);

    // Draw idle/game over state
    useEffect(() => {
        if (gameState === "playing") return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "#171717";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Ground
        ctx.strokeStyle = "#404040";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, GROUND_Y);
        ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
        ctx.stroke();

        // Dino
        ctx.fillStyle = "#a3a3a3";
        ctx.fillRect(20, GROUND_Y - DINO_HEIGHT + 10, 25, 25);
        ctx.fillRect(35, GROUND_Y - DINO_HEIGHT, 20, 15);
        ctx.fillStyle = "#171717";
        ctx.fillRect(48, GROUND_Y - DINO_HEIGHT + 4, 4, 4);
        ctx.fillStyle = "#a3a3a3";
        ctx.fillRect(25, GROUND_Y - DINO_HEIGHT + 35, 6, 9);
        ctx.fillRect(35, GROUND_Y - DINO_HEIGHT + 35, 6, 9);
        ctx.fillRect(10, GROUND_Y - DINO_HEIGHT + 15, 15, 8);

        // Text
        ctx.fillStyle = "#737373";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";

        if (gameState === "idle") {
            ctx.fillText("Press SPACE or TAP to start", CANVAS_WIDTH / 2, GROUND_Y / 2);
        } else if (gameState === "over") {
            ctx.fillStyle = "#ef4444";
            ctx.font = "bold 18px sans-serif";
            ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, GROUND_Y / 2 - 10);
            ctx.fillStyle = "#737373";
            ctx.font = "14px sans-serif";
            ctx.fillText(`Score: ${score}  |  Press SPACE or TAP to restart`, CANVAS_WIDTH / 2, GROUND_Y / 2 + 15);
        }

        // High score
        ctx.textAlign = "right";
        ctx.font = "16px monospace";
        ctx.fillStyle = "#737373";
        ctx.fillText(`HI ${String(highScore).padStart(5, "0")}`, CANVAS_WIDTH - 10, 25);
    }, [gameState, score, highScore]);

    return (
        <motion.div
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Gamepad2 size={18} className="text-neutral-500" />
                    Mini Game
                </h2>
                {gameState !== "idle" && (
                    <button
                        onClick={startGame}
                        className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        aria-label="Restart game"
                    >
                        <RotateCcw size={14} className="text-neutral-500" />
                    </button>
                )}
            </div>

            <div
                className="rounded-xl overflow-hidden cursor-pointer bg-neutral-900"
                onClick={jump}
            >
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="w-full h-auto"
                    style={{ imageRendering: "pixelated" }}
                />
            </div>

            <p className="text-xs text-neutral-500 mt-2 text-center">
                Press SPACE or tap to jump over cacti!
            </p>
        </motion.div>
    );
}
