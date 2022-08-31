const Spinner = () => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="200"
        height="200"
        version="1"
        viewBox="0 0 128 128"
        >
        <g>
          <path
            fill="#ffb118"
            d="M64 0L40.08 21.9a10.98 10.98 0 00-5.05 8.75C34.37 44.85 64 60.63 64 60.63V0z"
          ></path>
          <path
            fill="#80c141"
            d="M128 64l-21.88-23.9a10.97 10.97 0 00-8.75-5.05C83.17 34.4 67.4 64 67.4 64H128z"
          ></path>
          <path
            fill="#cadc28"
            d="M63.7 69.73a110.97 110.97 0 01-5.04-20.54c-1.16-8.7.68-14.17.68-14.17h38.03s-4.3-.86-14.47 10.1c-3.06 3.3-19.2 24.58-19.2 24.58z"
          ></path>
          <path
            fill="#cf171f"
            d="M64 128l23.9-21.88a10.97 10.97 0 005.05-8.75C93.6 83.17 64 67.4 64 67.4V128z"
          ></path>
          <path
            fill="#ec1b21"
            d="M58.27 63.7a110.97 110.97 0 0120.54-5.04c8.7-1.16 14.17.68 14.17.68v38.03s.86-4.3-10.1-14.47c-3.3-3.06-24.58-19.2-24.58-19.2z"
          ></path>
          <path
            fill="#018ed5"
            d="M0 64l21.88 23.9a10.97 10.97 0 008.75 5.05C44.83 93.6 60.6 64 60.6 64H0z"
          ></path>
          <path
            fill="#00bbf2"
            d="M64.3 58.27a110.97 110.97 0 015.04 20.54c1.16 8.7-.68 14.17-.68 14.17H30.63s4.3.86 14.47-10.1c3.06-3.3 19.2-24.58 19.2-24.58z"
          ></path>
          <path
            fill="#f8f400"
            d="M69.73 64.34a111.02 111.02 0 01-20.55 5.05c-8.7 1.14-14.15-.7-14.15-.7V30.65s-.86 4.3 10.1 14.5c3.3 3.05 24.6 19.2 24.6 19.2z"
          ></path>
          <circle cx="64" cy="64" r="2.03"></circle>
          <animateTransform
            attributeName="transform"
            dur="600ms"
            from="0 64 64"
            repeatCount="indefinite"
            to="-360 64 64"
            type="rotate"
          ></animateTransform>
        </g>
      </svg>
    )
}

export default Spinner;
