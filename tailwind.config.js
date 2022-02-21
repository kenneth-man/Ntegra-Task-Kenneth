// custom tailwind values
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Heebo']
            },
            colors: {
                'spaceX': 'rgb(0, 82, 136)'
            },
            width: {
                'table': '1200px'
            },
            height: {
                'table': '700px'
            },
            minHeight: {
                'heading': '100px',
                'result': '80px',
                'pagination': '60px'
            },
            maxHeight: {
                'modal-details': '300px',
            },
            borderRadius: {
                'table': '35px'
            }
        },
    },
    plugins: [],
}
