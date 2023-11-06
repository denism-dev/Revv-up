export function Label(props) {
    return (
        <label
            className="pt-[8px] w-[30%] text-gray-600 text-right mx-[10px]"
            htmlFor={props.for}>
            {props.text}
        </label>
    )
}