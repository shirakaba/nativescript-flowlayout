export interface Context {
  stageSize: CGRect;
  root: UIView;

  reset(): void;
  setUp(textContainer: NSTextContainer): void;
}

const usedBeforeInitMessage = "Context accessed before initialization.";

const lazyContext: Partial<Context> = {};

export const context: Context = {
  get stageSize(): CGRect {
    if (!lazyContext.stageSize) {
      throw new Error(usedBeforeInitMessage);
    }
    return lazyContext.stageSize;
  },
  get root(): UIView {
    if (!lazyContext.root) {
      throw new Error(usedBeforeInitMessage);
    }
    return lazyContext.root;
  },
  reset() {
    for (const subview of context.root.subviews) {
      subview?.removeFromSuperview();
    }
  },

  setUp(textContainer: NSTextContainer) {
    if (context.root.subviews.count) {
      throw new Error(
        "Root still has subviews. Must call reset() before setUp()",
      );
    }

    textContainer.size = context.stageSize.size;
    context.root.addSubview(
      UITextView.alloc().initWithFrameTextContainer(
        context.stageSize,
        textContainer,
      ),
    );
  },
};

export function initializeTestContext(
  context: Pick<Context, "root" | "stageSize">,
) {
  lazyContext.root = context.root;
  lazyContext.stageSize = context.stageSize;
}
