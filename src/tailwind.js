// Configuração do Tailwind
tailwind.config = {
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in',
                'fade-out': 'fadeOut 0.3s ease-out'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                fadeOut: {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(-10px)' }
                }
            },
            transitionOpacity: {
                '300': 'opacity 0.3s ease-in-out'
            }
        }
    }
}