const tools = {

  tierlistHandler: (source, newObj) => {

    // source.forEach((item) => {
    //   let id = item.id;
    //   tierlist[id] = item;
    // })


    // Merging objects
    newObj.forEach((item) => {
      source[item.id] = item;
    })

    return source;

  }

}

export default tools;
