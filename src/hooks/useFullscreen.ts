/*
 * @Author: 郭郭
 * @Date: 2025/11/20
 * @Description:
 */
import React, { useCallback, useEffect, useState } from 'react';

const useFullscreen = (targetRef: React.RefObject<HTMLElement> | string) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 获取目标元素
  const getTargetElement = (): HTMLElement | null => {
    if (typeof targetRef === 'string') {
      return document.querySelector(targetRef);
    }
    return targetRef.current;
  };

  // 切换全屏
  const toggle = useCallback(() => {
    const elem = getTargetElement();
    if (!elem) return;

    if (!isFullscreen) {
      // 进入全屏
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen();
      } else if ((elem as any).mozRequestFullScreen) {
        (elem as any).mozRequestFullScreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      }
    } else {
      // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  }, [isFullscreen]);

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement;

      const elem = getTargetElement();
      // 只有当全屏元素是我们指定的目标时，才认为是“我们的全屏”
      setIsFullscreen(
        !!(fullscreenElement && elem && fullscreenElement === elem),
      );
    };

    // 添加事件监听
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange,
      );
    };
  }, [targetRef]);

  return {
    isFullscreen,
    toggle,
  };
};

export default useFullscreen;
