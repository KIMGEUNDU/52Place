/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./client/**/*.html'],
	theme: {
		extend: {
			colors: {
				white: '#ffffff',
				primary: '#609966',
				secondary: '#38593C',
				profileBg: '#243826',
				info: '#F03F40',
				contentSecondary: '#6B6B6B',
				contentTeriary: '#A6A6A6',
				gray1: '#E1E1E1',
				gray7: '#404040',
				light3: '#74C37E',
				notSelect: '#A1CAA5',
				thumnail: '#C4C4C4',
				thumnailBg: '#E8E8E8',
			},
			boxShadow: {
				bottom: '0px 1px 5px 0px rgba(0, 0, 0, 0.25)',
				thumnail: '1px 4px 4px 0px rgba(0, 0, 0, 0.4);',
			},
			backgroundImage: {
				cakeImage: 'url(/assets/images/cake.png)',
				burgerFalse: 'url(/assets/icons/burgeractive=false.png)',
				burgerTrue: 'url(/assets/icons/burgeractive=true.png)',
				photoTrue: 'url(/assets/icons/photoactive=true.png)',
				photoFalse: 'url(/assets/icons/photoactive=false.png)',
				coverPhoto: 'url(/assets/icons/photo.png)',
				check: 'url(/assets/icons/check.png)',
				plus: 'url(/assets/icons/plus.png)',
				arrowBlack: 'url(/assets/icons/arrow-right-black.png)',
				pencil: 'url(/assets/icons/pencil.png)',
				heart: 'url(/assets/icons/heart.png)',
				subway: 'url(/assets/icons/subway.png)',
			},
		},
	},
	plugins: [],
};
