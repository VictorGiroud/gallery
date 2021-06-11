import { useState, useEffect } from "react"

const useShrunk = () => {
  const [isShrunk, setShrunk] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShrunk(isShrunk => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 60 ||
            document.documentElement.scrollTop > 60)
        ) {
          return true
        }

        if (
          isShrunk &&
          document.body.scrollTop < 2 &&
          document.documentElement.scrollTop < 2
        ) {
          return false
        }

        return isShrunk
      })
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return isShrunk
}

export default useShrunk
