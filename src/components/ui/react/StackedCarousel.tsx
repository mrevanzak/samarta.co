import { type MotionValue, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { useState } from 'react';

const LENGTH = 4;

export function StackedCarousel() {
  const progress = useMotionValue((LENGTH - 1) / 2);
  const progressStep = useTransform(progress, (latest) => Math.floor(latest));
  const [direction, setDirection] = useState(1);

  useMotionValueEvent(progressStep, 'change', (latest) => {
    const previous = progressStep.getPrevious();
    setDirection(previous && previous > latest ? -1 : 1);
  });

  useMotionValueEvent(progress, 'change', (latest) => {
    if (latest % 1 === 0) {
      setDirection(1);
    }
  });

  return (
    <Snap progress={progress}>
      {[...Array(LENGTH)].map((_, key) => (
        <Card key={key} progress={progress} direction={direction} index={key} />
      ))}
    </Snap>
  );
}

import { motion, transform } from 'framer-motion';

type CardProps = {
  index: number;
  progress: MotionValue<number>;
  direction: number;
};

const Card = ({ index, progress, direction }: CardProps) => {
  const distanceFromFront = useTransform(progress, (latest) => latest - index);
  const distanceFromFrontABS = useTransform(distanceFromFront, (latest) => Math.abs(latest));

  const [isFirst, setIsFirst] = useState(distanceFromFrontABS.get() < 0.5);

  useMotionValueEvent(distanceFromFront, 'change', (latest) => {
    const previous = distanceFromFront.getPrevious();
    if (previous === undefined) return;

    /* Check when the progress sign changes */
    if (latest * previous <= 0) {
      setIsFirst(true);
    }

    /* When the progress becomes greater than 1 or less than -1 */
    if (Math.abs(latest) >= 1) {
      setIsFirst(false);
    }
  });

  const scale = useTransform(distanceFromFrontABS, [0, 0.5, 1], isFirst ? [1, 0.95, 1] : [1, 1, 1]);

  const x = useTransform(
    distanceFromFront,
    [-1, -0.5, 0, 0.5, 1],
    isFirst ? ['12%', '77%', '0%', '-77%', '-12%'] : ['12%', '5%', '0%', '-5%', '-12%'],
    {
      clamp: false,
    }
  );

  const z = useTransform(distanceFromFrontABS, [0, 1], [0, -170], {
    clamp: false,
  });

  const rotateZ = useTransform(distanceFromFront, [0, 1], [0, -2.4], {
    clamp: false,
  });

  const rotateY = useTransform(distanceFromFrontABS, (value) => {
    return transform(value % 1, [0, 0.5, 1], isFirst ? [0, -45, 0] : [0, -20, 0]) * direction;
  });

  /* Need to keep z-index 0 for a bit more to avoid a flick */

  const zIndex = useTransform(distanceFromFront, [-2, -1, 0, 0.7, 2], [-2, -1, 0, 0, -2], {
    clamp: false,
  });

  return (
    <motion.div
      style={{
        scale,
        rotateZ,
        rotateY,
        zIndex,
        transformPerspective: 1000,
        x,
        z,
      }}
      className="card"
    />
  );
};

import { useTouch } from '@/utils/react-hooks';
import { animate, useScroll } from 'framer-motion';
import { Children, useEffect, useRef } from 'react';
import { useResizeObserver } from 'usehooks-ts';

const Snap = ({ children, progress }: { children: React.ReactNode; progress: MotionValue<number> }) => {
  const $wrapperRef = useRef<HTMLDivElement>(null);
  const length = Children.count(children);
  const supportTouch = useTouch();
  const dragX = useMotionValue(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const [dragConstraints, setDragConstraints] = useState<{
    left: number;
    right: number;
  }>();

  const { scrollYProgress, scrollXProgress } = useScroll({
    container: $wrapperRef,
  });

  const onMouseDown = () => setIsDragActive(true);

  const onMouseUp = () => {
    if (dragX.getVelocity() === 0) {
      animate(dragX, getSnappedTarget(dragX.get()));
    }
  };

  useEffect(() => {
    if (isDragActive && $wrapperRef.current) {
      dragX.jump(-$wrapperRef.current.scrollTop);
    }
  }, [isDragActive, dragX]);

  useMotionValueEvent(dragX, 'animationComplete', () => setIsDragActive(false));

  useMotionValueEvent(supportTouch ? scrollXProgress : scrollYProgress, 'change', (latest) => {
    progress.set(transform(latest, [0, 1], [0, length - 1]));
  });

  useResizeObserver({
    ref: $wrapperRef,
    onResize: () => {
      if (!$wrapperRef.current) return;

      setDragConstraints({
        left: -($wrapperRef.current.scrollHeight - $wrapperRef.current.clientHeight),
        right: 0,
      });
    },
  });

  useMotionValueEvent(dragX, 'change', (latest) => {
    if ($wrapperRef.current?.scrollTop) $wrapperRef.current.scrollTop = Math.abs(latest);
  });

  useEffect(() => {
    if (!$wrapperRef.current) return;
    const { clientWidth, clientHeight } = $wrapperRef.current;

    $wrapperRef.current[supportTouch ? 'scrollLeft' : 'scrollTop'] = transform(
      progress.get(),
      [0, length - 1],
      [0, (supportTouch ? clientWidth : clientHeight) * (length - 1)]
    );
  }, [length, progress, supportTouch]);

  const getSnappedTarget = (value) => {
    if (!$wrapperRef.current) return 0;
    return Math.round(value / $wrapperRef.current.clientHeight) * $wrapperRef.current.clientHeight;
  };

  return (
    <motion.div
      className="snap"
      ref={$wrapperRef}
      _dragX={dragX}
      drag={!supportTouch ? 'x' : undefined}
      dragElastic={0}
      dragConstraints={dragConstraints}
      dragTransition={{
        power: 0.4,
        timeConstant: 90,
        modifyTarget: getSnappedTarget,
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={
        isDragActive
          ? {
              overflow: 'hidden',
              scrollSnapType: 'none',
            }
          : undefined
      }
    >
      {Children.map(children, (child, key) => (
        <div className="snap-item" key={key}>
          {child}
        </div>
      ))}
    </motion.div>
  );
};
