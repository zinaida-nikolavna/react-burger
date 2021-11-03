import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import {useRef} from 'react';
import { useDispatch } from 'react-redux';
import burgerIngredientStyles from './burgerIngredient.module.css';
import { moveCard } from '../../services/store/burger';
import { TIngredient } from '../../utils/types'; 

type TBurgerIngredientProps = {
    ingredient: TIngredient;
    id: string;
    index: number;
    deleteIngredient: (item: TIngredient, index: number) => void;
}

/**
 * Компонент записи(ингредиент) в реестре конструктора бургера
 * @param ingredient - данные игредиента
 * @param id - уникальный uuid ингредиента
 * @param index - индекс(положение) ингредиента в реестре
 * @param deleteIngredient - функция удаления ингредиента
 * @returns 
 */
function BurgerIngredient({ingredient, id, index, deleteIngredient}: TBurgerIngredientProps): React.ReactElement {
    const dispatch = useDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: 'element',
        hover(item: {index: number}, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            if (!clientOffset) {
              return;  
            }
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            dispatch(moveCard({dragIndex, hoverIndex}));
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
    },
})
    const [{isDragging}, drag] = useDrag({
      type: 'element',
      item: () => {
        return { id, index };
    },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    })
})

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
            <div ref={ref} className={burgerIngredientStyles.listItem} style={{opacity}}>
                {ingredient.type !== 'bun' && <DragIcon type="primary" />}
                {ingredient.type !== 'bun' && 
                <ConstructorElement
                    type={undefined}
                    isLocked={false}
                    handleClose={() => deleteIngredient(ingredient, index)}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}/> }
            </div>                                
    )
}

export default BurgerIngredient;