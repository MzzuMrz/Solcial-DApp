declare namespace JSX {
    interface IntrinsicElements {
      'appkit-wallet-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        wallet: string;
        'data-testid'?: string;
      }, HTMLElement>;
    }
  }