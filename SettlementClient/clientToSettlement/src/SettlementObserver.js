import { makeObservable, observable, computed, action } from 'mobx';
const baseUrl = 'https://localhost:7112/api/Settlements';
class Settlements {
    settlements = []
    constructor() {
        makeObservable(this, {
            settlements: observable,
            addSettlement: action,
            deleteSettlement: action,
            updateSettlement: action,
            init: action,
            getSettlements: computed
        });
        this.init();
    }
    async init() {
        try {
            const res = await fetch(`${baseUrl}`);
            const data = await res.json();
            action(() => {
                this.settlements = data;
            })();
        } catch (error) {
            console.log("Error:", error);
        }
    }
    async addSettlement(settlementAdd) {
        try {
            const res = await fetch(`${baseUrl}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settlementAdd)
            });
            console.log(res);
            if (res.status === 200) {
                let newSettlement = await res.json();
                this.settlements.push(newSettlement);
                console.log("Service data added successfully");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }
    async deleteSettlement(id) {
        try {
            const res = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            });
            console.log(res);
            if (res.status === 200) {

                console.log("Service data deleted successfully");
            }
        }
        catch (error) {
            console.log("Error:", error);
        }
    }
    async updateSettlement(id, name) {
        try {
            const res = await fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(name)
            });
            console.log(res);
            if (res.status === 200) {
                const index = this.settlements.findIndex(x => x.id === id);
                this.settlements[index].name = name;
                console.log("Service data deleted successfully");
            }
        }
        catch (error) {
            console.log("Error:", error);
        }
    }
    get getSettlements() {
        return this.settlements;
    }
}
const singletonSettlement = new Settlements();
export default singletonSettlement;
