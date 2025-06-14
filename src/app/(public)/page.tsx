import { Footer } from "./_componets/footer"
import { Header } from "./_componets/header"
import { Hero } from "./_componets/hero"


export default function Home() {


  return (

    <div className="flex 
                    flex-col 
                    min-h-screen
                    h-screen 
                    bg-cover 
                    bg-center" 
                    style={{ backgroundImage: "url('/bg-home.jpg')" }}
    >

      {/* Overlay escuro com opacidade */}
      <div className="absolute 
                      inset-0 
                    bg-blue-950/30" /> 

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">

        <Header />

        <Hero />

        {/* <Footer /> */}
      
      </div>  

    </div>  
  )

}