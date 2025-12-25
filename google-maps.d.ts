declare namespace JSX {
  interface IntrinsicElements {
    "gmp-place-autocomplete": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      class?: string;
      placeholder?: string;
    };
  }
}
