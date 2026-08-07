import blockRegistry from './blockRegistry.js'

function PageRenderer({ page = [] }) {
  return (
    <>
      {page.map((section, index) => {
        const BlockComponent = blockRegistry[section.type]

        if (!BlockComponent) {
          return null
        }

        return <BlockComponent key={`${section.type}-${index}`} {...section.props} />
      })}
    </>
  )
}

export default PageRenderer
