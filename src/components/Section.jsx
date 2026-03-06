export default function Section({ id, title, children }) {
  return (
    <section id={id} className="py-10 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">{title}</h2>
        {children}
      </div>
    </section>
  )
}
