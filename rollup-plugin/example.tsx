function HelloWorld({foo}) {
    return foo;
}

export function foo(bar: string) {
    const hello = true;
    return  <>
        <div>
            <p onClick={() => {console.log('aaaa');}}>Lorem</p>
            {hello && <div></div>}
            <div class="name" id={'id'}>{bar}</div>
            <HelloWorld foo={() => <span></span>} />
        </div>
    </>;
}
