import React, { useState } from 'react'
import { Modal, Input, Button } from 'antd'

const TagsManager = ({ tags, tagUpdate }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [tagValue, setTagValue] = useState('')
  const fetchData = async () => {
    try {
      const response = await fetch('/api/tags', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setTags(data.data)
      } else {
        const { error } = await response.json()
        console.error(error)
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      // Handle the error as needed
    } finally {
    }
  }
  const addTag = async (selectedTag) => {
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 1,
          newTags: [selectedTag]
        })
      })

      if (response.ok) {
        const data = await response.json()
        return data.data
      } else {
        const { error } = await response.json()
        throw new Error(error)
      }
    } catch (error) {
      console.error('Error adding tag:', error)
      throw error
    }
  }
  const delTag = async (selectedTag) => {
    try {
      const response = await fetch('/api/tags', {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 1,
          newTags: [selectedTag]
        })
      })

      if (response.ok) {
        const data = await response.json()
        return data.data
      } else {
        const { error } = await response.json()
        throw new Error(error)
      }
    } catch (error) {
      console.error('Error adding tag:', error)
      throw error
    }
  }
  const addHashtag = (newtag) => {
    tagUpdate([...tags, newtag])
    addTag(newtag)
    setTagValue('')
  }

  const deleteHashtag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index)
    tagUpdate(updatedTags)
  }

  return (
    <div className="w-full">
      <Button
        onClick={() => {
          setShowPopup(true)
        }}
        className="w-full border rounded shadow p-1 mb-1"
      >
        Manage Tags
      </Button>

      <Modal
        title="Manage Tags"
        open={showPopup}
        onOk={() => {
          alert('TAGS')
        }}
        onCancel={() => setShowPopup(false)}
        okText={'Done'}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
      >
        <div className="my-2">
          <p>Add Tags</p>
          <div className="flex justify-between gap-2">
            <Input
              placeholder="Enter Hashtag Name..."
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
            />
            <Button
              onClick={() => {
                addHashtag(tagValue)
              }}
            >
              Add
            </Button>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className="my-2">
          <p>Your Tags:</p>
          <div className="flex flex-col gap-2">
            {tags?.map((tag, index) => {
              return (
                <div key={index} className="flex justify-between gap-2">
                  <li key={index} className="border rounded-lg p-1 px-3 w-full">
                    #{tag}
                  </li>
                  <Button
                    onClick={() => {
                      delTag(tag)
                    }}
                  >
                    ❌
                  </Button>
                </div>
              )
            })}
            {tags?.length < 1 ? 'No tags found!' : ''}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TagsManager
