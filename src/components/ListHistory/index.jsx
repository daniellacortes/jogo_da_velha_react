import { useEffect, useState } from "react";


//  aqui eu recebo o array que é a listagem
export const ListHistory = ({listArr}) => {

  // aqui estou apenas criando um state para menipular a lista
  const [listToRender, setListToRender] = useState([])


  // funcao para fazer o revert 
  const revertList = () => {
    setListToRender([...listToRender.reverse()])
  }

  // aqui eu estou utilizando o useEffect para tratar a lista quando eu receber pelo component
  useEffect(() => {

    // basicamente um dos problemas é que o react n consegue detectar quando vc trocar um array por um array
    // entao precisamos mudar um pouco a logica, eu criei uma propriedade step que guarda o index de cada step
    // e adiciono ele para ser renderizado
    const newArr = listArr ? listArr.map((item, index) => 
    ({
      item:[...item],
      step: index
    })    
    ) : []
    setListToRender(newArr)
  }, [listArr])

  return (
    <>
    {
      // aqui eu crio apenas um map para poder listar cada um dos items ... vc agora precisa fazer a logica para o start que é criado 
      // sozinho quando vc faz o primeiro click 
      listToRender && listToRender.map((order, index) => {
        return (
          <div key={index}>
          <button onClick={() => jumpTo(order)}>{`step ${order.step}`}</button>
        </div>    
      )})}

     <br />
      <br />
    <button onClick={revertList} >Ordenar</button> 
    </>
  )
}