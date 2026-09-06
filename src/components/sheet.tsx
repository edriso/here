import { useEffect, useRef, type ReactNode } from 'react';

interface SheetProps {
  ariaLabel: string;
  onClose: () => void;
  children: ReactNode;
}

const FOCUSABLE = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * A bottom sheet that slides up, used for managing children. Accessible: it
 * traps focus, closes on Escape or a backdrop click, and restores focus.
 */
export function Sheet({ ariaLabel, onClose, children }: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = (): HTMLElement[] =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => !element.hasAttribute('disabled'),
      );

    (getFocusable()[0] ?? panel).focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab') {
        return;
      }
      const items = getFocusable();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="h-veil"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 75,
        background: 'color-mix(in oklab, var(--bg) 65%, transparent)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className="h-sheet"
        onClick={(event) => event.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 560,
          background: 'var(--surface)',
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          border: '1px solid var(--line)',
          borderBottom: 'none',
          padding: '22px 22px calc(24px + env(safe-area-inset-bottom))',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
