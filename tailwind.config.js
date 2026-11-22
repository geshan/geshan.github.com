module.exports = {
  content: ['./**/*.html', './**/**/*.html', './**/**/*.html', './**/**/**/*.html'],
  theme: {
    gradientColorStops: (theme) => ({
      ...theme('colors'),
      purpleone: '#6947E7',
      purpletwo: '#9D7BE5',
    }),
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)'],
        ui: ['var(--font-ui)'],
        body: ['var(--font-body)'],
        nav: ['var(--font-nav)'],
      },
      colors: {
        /* Semantic theme tokens */
        surface: 'var(--surface-canvas)',
        surfaceTinted: 'var(--surface-tinted)',
        surfaceAccent: 'var(--surface-accent)',
        surfaceElevated: 'var(--surface-elevated)',
        surfaceSubtle: 'var(--surface-subtle)',
        surfaceTag: 'var(--surface-tag)',
        textStrong: 'var(--text-strong)',
        textBody: 'var(--text-body)',
        textMuted: 'var(--text-muted)',
        textAccent: 'var(--text-accent)',
        fillAccent: 'var(--fill-accent)',
        textOnAccent: 'var(--text-on-accent)',
        borderSubtle: 'var(--border-subtle)',
        borderStrong: 'var(--border-strong)',

        /* Legacy theme color aliases mapped to semantic tokens */
        avocado: 'var(--surface-accent)',
        lightAvocado: 'var(--surface-tinted)',
        secondaryAvocado: 'var(--surface-tinted)',
        darkAvocado: 'var(--text-accent)',

        textColor: 'var(--text-muted)',
        blackText: 'var(--text-strong)',
        neutralGray: 'var(--border-subtle)',
        lightGray: 'var(--text-muted)',
        gray: 'var(--text-body)',
        alternateGray: 'var(--surface-subtle)',
        midgrey: 'var(--text-muted)',
        lightbg: 'var(--border-subtle)',
        mildgrey: 'var(--text-muted)',
        darkgrey: 'var(--text-muted)',
        midblack: 'var(--text-blockquote)',
        quoteGray: '#B8D892',
      },
      spacing: {
        138: '8.62rem',
        90: '5.62rem',
        75: '4.68rem',
        222: '13.9rem',
        68: '4.25rem',
        249: '15.5rem',
        140: '8.75rem',
      },
      padding: {
        15: '1rem',
        30: '1.5rem',
      },
      inset: {
        '-30': '-8rem',
      },
      gridTemplateRows: {
        10: 'repeat(10, minmax(0, 1fr))',
      },
      underlineOffset: {
        16: '4rem',
      },
    },
  },
  plugins: [],
};
