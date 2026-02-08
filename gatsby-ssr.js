import React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="goatcounter"
      data-goatcounter="https://dev-log.goatcounter.com/count"
      async
      src="//gc.zgo.at/count.js"
    />,
  ])
}
