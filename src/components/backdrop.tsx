const SHAPE_DRIFT =
    'animate-[backdrop-drift_24s_ease-in-out_infinite] motion-reduce:animate-none';

/** Fixed page background: colour shapes under a frosted veil, grid on top. */
export function Backdrop(): React.JSX.Element {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
            <div
                className={`absolute -top-[15%] -left-[10%] size-[55vmax] rounded-full bg-(--backdrop-1) ${SHAPE_DRIFT}`}
            />
            <div
                className={`absolute top-[30%] -right-[15%] size-[45vmax] rounded-[30%] bg-(--backdrop-2) ${SHAPE_DRIFT} [animation-delay:-8s] [animation-direction:reverse]`}
            />
            <div
                className={`absolute -bottom-[20%] left-[20%] size-[40vmax] rounded-full border-[6vmax] border-(--backdrop-3) ${SHAPE_DRIFT} [animation-delay:-16s]`}
            />

            <div className="absolute inset-0 bg-(--backdrop-veil) backdrop-blur-[80px]" />

            {/* above the veil so the lines stay sharp; faded towards the edges */}
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] [background-image:linear-gradient(var(--backdrop-grid)_1px,transparent_1px),linear-gradient(90deg,var(--backdrop-grid)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>
    );
}
