


export const selectSortedBooks=(state)=>{
    const{books,sortBy,order}=state.books;

    return[...books].sort((a,b)=>{
        const valA=a[sortBy].toLowerCase();
        const valB=b[sortBy].toLowerCase();

        if(order==="ascending"){
            return valA.localeCompare(valB);
        }
        else{
            return valB.localeCompare(valA);
        }
    })
}