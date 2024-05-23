/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
      theme: {
          extend: {
            fontFamily:{
              poppins:["Poppins","sans-serif"]
            },
            colors:{
              bg:'#151515',
              primary:'#A91D3A',
              accent:'#C73659',
              neutral:'#EEEEEE'
            }
          },
      },
  plugins: [],
};