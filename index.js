// https://gist.github.com/rosszurowski/67f04465c424a9bc0dae
function lerpColor(a, b, amount) {
    let ah = +a.replace("#", "0x"),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = +b.replace("#", "0x"),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab)

    return "#" + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1)
}

function parse(from, to, t) {
    if (typeof from === "number") {
        return from + (to - from) * t
    } else if (typeof from === "string" && from.includes("#")) {
        return lerpColor(from, to, t)
    } else {
        throw new Error("Unknown type: " + from)
    }
}

// based off https://medium.com/allenhwkim/animate-with-javascript-eef772f1f3f3
export default function animate({
    from,
    to,
    duration = 1000,
    delay = 0,
    render = () => { },
    start = () => { },
    end = () => { },
    cancel = () => { },
    easing = (t) => t 
}) { 
    let now = performance.now()
    let hasStarted = false
    let id
    let params = Object.keys(from)
    let tick = (time) => {
        if (time - now > delay) {
            let timeFraction = Math.max(Math.min((time - delay - now) / duration, 1), 0)

            if (!hasStarted) {
                hasStarted = true 
                start()
            }

            let t = easing(timeFraction)
            let interpolated = {}

            if (typeof from === "object") {
                for (let key of params) {
                    interpolated[key] = parse(from[key], to[key], t)
                }
            } else {
                interpolated = parse(from, to, t)
            }

            render(interpolated)

            if (timeFraction < 1) {
                id = requestAnimationFrame(tick)
            } else if (timeFraction === 1) {
                end()
            }
        } else {
            id = requestAnimationFrame(tick)
        }
    }

    id = requestAnimationFrame(tick)

    return () => {
        window.cancelAnimationFrame(id)
        cancel()
    }
}
 