//יצא לי מאוד ארוך כי רציתי לעשות שבחיפוש אם זה אות 
// אנגלית שישלח לקומפוננטה אחרת ולא הסתדרתי אז עשיתי הכל באותו עמוד
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import singletonSettlement from './SettlementObserver';
const Try = observer(() => {
    const [listSettlements, setListSettlement] = useState([]);
    const [thisPage, setThisPage] = useState(1);
    const settlementsPerPage = 5;
    const lastInPage = thisPage * settlementsPerPage;
    const firstInPage = lastInPage - settlementsPerPage;
    const currentSettlements = listSettlements.slice(firstInPage, lastInPage);
    const nameRef = useRef();
    const nameAddRef = useRef();
    const [isUpdate, setIsUpdate] = useState(false);
    const [idUpdate, setIdUpdate] = useState();
    const [nameUpdate, setNameUpdate] = useState();
    const [isAdd, setIsAdd] = useState(false);
    const [isClick, setIsClick] = useState(false)
    function show() {
        setListSettlement(singletonSettlement.getSettlements);
        setIsClick(!isClick)
    }
    const listToHebrew = {
        "a": 'ש',
        "b": 'נ',
        "c": 'ב',
        "d": 'ג',
        "e": 'ק',
        "f": 'כ',
        "g": 'ע',
        "h": 'י',
        "i": 'ן',
        "j": 'ח',
        "k": 'ל',
        "l": 'ך',
        "m": 'צ',
        "n": 'מ',
        "o": 'ם',
        "p": 'פ',
        "q": '/',
        "r": 'ר',
        "s": 'ד',
        "t": 'א',
        "u": 'ו',
        "v": 'ה',
        "w": "'",
        "x": 'ס',
        "y": 'ט',
        "z": 'ז',
        ",": 'ת',
        ".": 'ץ',
        ";": 'ף',
        " ": ' ',
        "": ''
    };

    const translate = (englishWord) => {
        let newWord = [];
        for (const char of englishWord.toLowerCase()) {
            if (listToHebrew[char]) {
                newWord.push(listToHebrew[char]);
            } else {
                newWord.push(char); 
            }
        }
        return newWord.join('');
    };
    function update(item) {
        setIsUpdate(!isUpdate);
        setIdUpdate(item.id);
        setNameUpdate(item.name);
    }

    function sendUpdate() {
        if (!listSettlements.find(x => x.name === nameRef.current.value)) {
            singletonSettlement.updateSettlement(idUpdate, nameRef.current.value);
        } else {
            alert("אתה מנסה לשנות לשם קיים");
        }
    }
    function deleteSettlement(id) {
        if (window.confirm('האם אתה בטוח שברצונך למחוק?')) {
            singletonSettlement.deleteSettlement(id);
        }
    }

    function addSettlement() {
        if (!listSettlements.find(x => x.name === nameAddRef.current.value)) {
            singletonSettlement.addSettlement(nameAddRef.current.value);
            singletonSettlement.init();
        } else {
            alert("אתה מנסה להוסיף שם קיים!");
        }
        setIsAdd(!isAdd);
    }
    const handleSearch = (search) => {
        let searchWord = search.charAt(0).toLowerCase();

        if (searchWord >= 'a' && searchWord <= 'z') {
            search = translate(search);
        }

        const filteredSettlements = singletonSettlement.getSettlements.filter(item => item.name.includes(search));
        setListSettlement(filteredSettlements);
    };
    function handleSort(type) {
        let sortedSettlements = [...listSettlements];
        if (type === 'up')
            sortedSettlements.sort((a, b) => a.name.localeCompare(b.name));
        if (type === 'down')
            sortedSettlements.sort((a, b) => b.name.localeCompare(a.name));
        setListSettlement(sortedSettlements);
    }
    function paginate(pageNumber) {
        setThisPage(pageNumber);
    }
    return (
        <div>
            <button onClick={show}>{!isClick ? <span>show</span> : <span>Hide</span>}</button>
            {isClick && (
                <div>
                    <input type='text' onChange={(e) => handleSearch(e.target.value)} placeholder='חיפוש'></input>
                    <div>
                        <button onClick={() => handleSort('up')}>מיון עולה</button>
                        <button onClick={() => handleSort('down')}>מיון יורד</button>
                    </div>
                    {currentSettlements.map((item) => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                            <button onClick={() => update(item)}>{!isUpdate ? <span>update</span> : <span>cancel update</span>}</button>
                            <button onClick={() => deleteSettlement(item.id)}>delete</button>
                            <p style={{ marginRight: '10px' }}>{item.name}</p>
                        </div>
                    ))}
                    <div>
                        {Array.from({ length: Math.ceil(singletonSettlement.getSettlements.length / settlementsPerPage) }).map((_, index) => (
                            <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                        ))}
                    </div>
                </div>
            )}
            {isUpdate ? (
                <>
                    <input type='text' defaultValue={nameUpdate} ref={nameRef} />
                    <button onClick={sendUpdate}>update!</button>
                </>
            ) : (
                <>
                    {isAdd ? (
                        <>
                            <input type='text' ref={nameAddRef} placeholder='insert name' />
                            <button onClick={() => addSettlement()}>add</button>
                        </>
                    ) : (
                        <button onClick={() => setIsAdd(!isAdd)}>add</button>
                    )}
                </>
            )}
        </div>
    );
});

export default Try;