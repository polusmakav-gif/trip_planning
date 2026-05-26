export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tutu: {
          blue: '#7C3AED',
          'blue-dark': '#15104F',
          'blue-light': '#EDE9FF',
          'blue-mid': '#DDD6FF',
          orange: '#FF6600',
          'orange-hover': '#E05000',
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
