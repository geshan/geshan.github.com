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
        avocado: '#CDE4B2',
        lightAvocado: '#F3F8EC',
        darkAvocado: '#517329',

        textColor: '#6A6C66',
        blackText: '#000000',
        lightGray: '#797B75',
        gray: '#3F423B',
        alternateGray: '#FAFAFA',
        midgrey: '#858393',
        lightbg: '#F5F5F5',
        mildgrey: '#8D8D8D',
        darkgrey: '#848393',
        midblack: '#251F54',
        avocado: '#CDE4B2',
        neutralGray: '#C1C2BF',
        quoteGray: '#B8D892',
        secondaryAvocado: '#F3F8EC',
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
