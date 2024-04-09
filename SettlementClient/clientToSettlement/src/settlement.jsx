import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import singletonSettlement from './SettlementObserver';
//import { transliterate as tr, slugify  } from 'transliteration';

const Settlement = observer(() => {
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
    const [searchSettlement, setSearchSettlement] = useState('');
    const [isClick, setIsClick] = useState(false)

    function show() {
        setListSettlement(singletonSettlement.getSettlements);
        setIsClick(!isClick)

    }

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
        singletonSettlement.deleteSettlement(id);
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

    function handleSearch(search) {
        setSearchSettlement(search);
    }

    function handleSort(type) {
        let sortedSettlements = [...listSettlements];
        if (type === 'up')
            sortedSettlements.sort((a, b) => a.name.localeCompare(b.name));
        if (type === 'down')
            sortedSettlements.sort((a, b) => b.name.localeCompare(a.name));
        setListSettlement(sortedSettlements);
    }

    function paginate(pageNumber){
        setThisPage(pageNumber);
    }

    return (
        <div>
            <button onClick={show}>{!isClick ? <span>show</span>: <span>Hide</span> }</button>
            {isClick && (
                <div>
                    <input type='text' onChange={(e) => handleSearch(e.target.value)} placeholder='חיפוש'></input>
                    <div>
                        <button onClick={() => handleSort('up')}>מיון עולה</button>
                        <button onClick={() => handleSort('down')}>מיון יורד</button>
                    </div>
                    {currentSettlements.filter(item => item.name.includes(searchSettlement)).map((item) => (
                            <>
                                <p key={item.id} value={`${item.id}|${item.name}`}>{item.name}</p>
                                <button onClick={() => update(item)}>{!isUpdate ? <span>update</span> : <span>cancel update</span>}</button>
                                <button onClick={() => deleteSettlement(item.id)}>delete</button>
                            </>
                        ))}
                    <div>
                        {Array.from({ length: Math.ceil(listSettlements.length / settlementsPerPage) }).map((_, index) => (
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
                            <input type='text' ref={nameAddRef} placeholder='הכנס שם' />
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

export default Settlement;