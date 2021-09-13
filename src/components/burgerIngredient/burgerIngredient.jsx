import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from "react-dnd";
import {useRef} from 'react';
import { useDispatch } from 'react-redux';
import burgerIngredientStyles from './burgerIngredient.module.css';
import { moveCard } from '../../services/reducers/burger';
import PropTypes from 'prop-types';

function BurgerIngredient({ingredient, id, index, deleteIngredient}) {
    const dispatch = useDispatch();

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'element',
        hover(item, monitor) {
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

BurgerIngredient.propTypes = {
    ingredient: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    deleteIngredient: PropTypes.func.isRequired
};