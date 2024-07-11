import React, { useEffect, useState } from 'react'
import { Tabs, Button, Modal, Input } from 'antd'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import toast from 'react-hot-toast'

const { TabPane } = Tabs

const DraggableTabNode = ({ className, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props['data-node-key']
    })
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleX: 1
      }
    ),
    transition,
    cursor: 'move'
  }
  return React.cloneElement(props.children, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners
  })
}

const LayoutBar = ({ data, update }) => {
  const [inputValue, setInputValue] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [selectedStep, setSelectedStep] = useState('')
  const [items, setItems] = useState([])

  const deleteStep = (stepName) => {
    let newSteps = data?.steps?.filter(
      (object) => object.step_name !== stepName
    )

    let multiStep = newSteps.length > 1 ? true : false

    update({
      ...data,
      multi_step: multiStep,
      steps: newSteps
    })
  }

  const DraggableField = ({ field, index, moveField, deleteField }) => {
    const [, drag] = useDrag({
      type: 'FIELD',
      item: { index }
    })

    const [, drop] = useDrop({
      accept: 'FIELD',
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveField(draggedItem.index, index)
          draggedItem.index = index
        }
      }
    })

    return (
      <div ref={(node) => drag(drop(node))}>
        <div className="my-3 mx-1 border rounded p-2 flex justify-between">
          <label htmlFor="">
            {field.label} - {field.type}
          </label>
          <div className="flex gap-2">
            {/* <Button
              className="text-green-600 p-1 hover:text-green-400"
              onClick={() =>
                alert("Move Up!")
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
            </Button>
            <Button
              className="text-green-600 p-1 hover:text-green-400"
              onClick={() =>
                alert("Move Down")
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
            </Button> */}
            {/* <Button
              className="text-blue-600 p-1 hover:text-blue-400"
              onClick={() => alert("Edit Field")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pen"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
            </Button> */}
            <Button
              className="text-red-500 p-1 hover:text-red-400"
              onClick={() => deleteField(field?.step_name, field?.label)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-2"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const deleteField = (stepName, fieldName) => {
    update((prevData) => {
      const updatedSteps = prevData.steps.map((step) => {
        if (step.step_name === stepName) {
          return {
            ...step,
            fields: step.fields.filter((field) => field.label !== fieldName)
          }
        }
        return step
      })

      return {
        ...prevData,
        steps: updatedSteps
      }
    })
  }
  const handleUpdateStep = () => {
    console.log('clled11--')

    update((prevData) => {
      console.log('clled--22')

      const updatedSteps = prevData.steps.map((step) => {
        if (step.step_name === selectedStep) {
          return {
            ...step,
            step_name: inputValue
          }
        }
        console.log('clled--333')

        return step
      })

      return {
        ...prevData,
        steps: updatedSteps
      }
    })
    console.log('clled')
    setShowPopup(false) // Close the modal
  }

  const moveField = (stepName, fromIndex, toIndex) => {
    update((prevData) => {
      const updatedSteps = prevData.steps.map((step) => {
        if (step.step_name === stepName) {
          const updatedFields = [...step.fields]
          const [movedField] = updatedFields.splice(fromIndex, 1)
          updatedFields.splice(toIndex, 0, movedField)

          return {
            ...step,
            fields: updatedFields
          }
        }
        return step
      })

      return {
        ...prevData,
        steps: updatedSteps
      }
    })
  }

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const activeIndex = items.findIndex((i) => i.key === active.id)
      const overIndex = items.findIndex((i) => i.key === over?.id)

      setItems((prev) => arrayMove(prev, activeIndex, overIndex))

      update((prevData) => {
        const updatedSteps = arrayMove(prevData.steps, activeIndex, overIndex)
        return {
          ...prevData,
          steps: updatedSteps
        }
      })
    }
  }
  const convertToItems = (steps) => {
    return steps.map((step, step_id) => ({
      key: step_id.toString(),
      label: step.step_name,
      children: (
        <div className="p-2 m-2 bg-slate-100 rounded text-left">
          {/* Existing content for each tab */}
          <div className="flex justify-between">
            <span>Step Name: {step?.step_name}</span>
            <div className="flex items-center">
              <button
                onClick={() => {
                  setInputValue(step.step_name)
                  setSelectedStep(step.step_name) // Set the selected step
                  setShowPopup(true)
                }}
                className="text-[#2832c2] p-2 hover:text-[#2832c2]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pen"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </button>
              <button
                className="text-red-500 p-2 hover:text-red-400"
                onClick={() => deleteStep(step?.step_name)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash-2"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>{' '}
            </div>
          </div>
          <br />
          <div>
            Fields:
            {step?.fields?.map((field, field_id) => (
              <DraggableField
                field={field}
                index={field_id}
                key={field_id}
                moveField={(fromIndex, toIndex) =>
                  moveField(step.step_name, fromIndex, toIndex)
                }
                deleteField={() => deleteField(step.step_name, field.label)}
              />
            ))}
            {step.fields.length < 1 ? <div>N/A</div> : ''}
          </div>
          <br />
        </div>
      )
    }))
  }

  useEffect(() => {
    setItems(convertToItems(data?.steps || []))
  }, [JSON.stringify(data?.steps)])

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <br />
        Form Name: <strong>{data?.formName}</strong>
        <br />
        <Tabs
          items={items}
          style={{ padding: '0px 20px' }}
          renderTabBar={(tabBarProps, DefaultTabBar) => (
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
              <SortableContext
                items={items?.map((i) => i.key)}
                strategy={horizontalListSortingStrategy}
              >
                <DefaultTabBar {...tabBarProps}>
                  {(node) => (
                    <DraggableTabNode {...node.props} key={node.key}>
                      {node}
                    </DraggableTabNode>
                  )}
                </DefaultTabBar>
              </SortableContext>
              <Modal
                title="Update step name"
                open={showPopup}
                onOk={() => handleUpdateStep()}
                onCancel={() => setShowPopup(false)}
                okText={'Update'}
                okButtonProps={{
                  style: { backgroundColor: 'blue', color: 'white' }
                }}
              >
                <Input
                  placeholder="Enter step name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </Modal>
            </DndContext>
          )}
        />
      </div>
    </DndProvider>
  )
}

export default LayoutBar
