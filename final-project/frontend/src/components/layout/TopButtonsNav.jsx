export default function TopButtonsNav({ items }) {
  return (
    <nav>
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          <button type={item.type || 'button'}>{item.label}</button>
        </a>
      ))}
      <br />
    </nav>
  )
}

