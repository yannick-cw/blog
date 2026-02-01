import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
})

const renderMermaid = async () => {
  // Find all mermaid code blocks (prismjs wraps them in <pre><code class="language-mermaid">)
  const mermaidBlocks = document.querySelectorAll('code.language-mermaid')
  
  for (let i = 0; i < mermaidBlocks.length; i++) {
    const codeBlock = mermaidBlocks[i]
    const pre = codeBlock.parentElement
    
    // Skip if already rendered
    if (pre.classList.contains('mermaid-rendered')) continue
    
    const code = codeBlock.textContent
    const id = `mermaid-${Date.now()}-${i}`
    
    try {
      const { svg } = await mermaid.render(id, code)
      
      // Create a container for the rendered diagram
      const container = document.createElement('div')
      container.className = 'mermaid-diagram'
      container.innerHTML = svg
      
      // Replace the pre block with the rendered diagram
      pre.parentNode.replaceChild(container, pre)
    } catch (error) {
      console.error('Mermaid rendering error:', error)
      pre.classList.add('mermaid-rendered')
    }
  }
}

export const onRouteUpdate = () => {
  // Small delay to ensure DOM is ready
  setTimeout(renderMermaid, 100)
}
