export const Heading2 = ({title}: Readonly<{title: string}>) => {
    return (
        <>
        <h2
            className={`text-2xl font-bold tracking-tight text-[#0d121b] dark:text-white`}
        >
        {title}
      </h2>
        </>
    )
}