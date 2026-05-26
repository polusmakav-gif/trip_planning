export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tutu: {
          blue: '#006CE0',
          'blue-dark': '#0055B8',
          'blue-light': '#EBF3FF',
          'blue-mid': '#DDEEFF',
          orange: '#FF6600',
          'orange-hover': '#E05800',
        },
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        lg: '10px',
        xl: '14px',
      },
    },
  },
}
