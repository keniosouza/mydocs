
export function Footer() {
  return (
    <footer className=" w-full py-6 text-center text-gray-500 text-sm md:text-base border">
      <p>
        Todos direitos reservados © {new Date().getFullYear()} - <span className="hover:text-black duration-300">ORIUS TECNOLOGIA</span>
      </p>
    </footer>
  )
}