import { useEffect ,useRef } from "react"

export function GradientButton({onClickBtn, label, className}) {
    const elBtn = useRef()

    useEffect(() => {
        elBtn.current.addEventListener('mousemove', e => {
            const rect = elBtn.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) * 100 / elBtn.current.clientWidth
            const y = (e.clientY - rect.top) * 100 / elBtn.current.clientHeight
            elBtn.current.style.setProperty('--mouse-x', x)
            elBtn.current.style.setProperty('--mouse-y', y)
        })
    } ,[])

    return <>
    {onClickBtn && <button ref={elBtn} onClick={onClickBtn} className={'gradient-button ' + className}>{label}</button>}
    {!onClickBtn && <button ref={elBtn} className={'gradient-button ' + className}>{label}</button>}
    </>
    
}