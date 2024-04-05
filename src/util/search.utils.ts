export const searchEl=(searchTerm:string,list:Array<String>)=>{
    // this element should take the takes a list and return the search
      const results = list.filter(textItem =>
      textItem.toLowerCase().includes(searchTerm)
    );
    return results;
}