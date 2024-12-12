import React, { useState, useRef, useCallback, useEffect } from 'react';

// Union type to handle both string and Option
type Option = { value: string; label: string } | string;

// Helper function to normalize Option
const normalizeOption = (option: Option): { value: string; label: string } => {
  return typeof option === 'string' 
    ? { value: option, label: option }
    : option;
};

interface AutocompleteProps {
  options: Option[];
  placeholder?: string;
  onSelectedItemsChange?: (selectedItems: string[]) => void;
}

function AutocompleteWithChips({ 
  options, 
  placeholder = "Search...", 
  onSelectedItemsChange 
}: AutocompleteProps) {
  // Normalize options at the start
  const normalizedOptions = options.map(normalizeOption);

  const [inputValue, setInputValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<{ value: string; label: string }[]>(normalizedOptions)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [selectedItems, setSelectedItems] = useState<{ value: string; label: string }[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    setFilteredOptions(
      normalizedOptions.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase()) &&
        !selectedItems.some(selected => selected.value === item.value)
      )
    )
    setIsOpen(true)
    setHighlightedIndex(-1)
  }, [normalizedOptions, selectedItems])

  const handleSelectItem = useCallback((item: { value: string; label: string }) => {
    setSelectedItems(prev => {
      const newSelectedItems = [...prev, item]
      // Convert to string array before calling onSelectedItemsChange
      onSelectedItemsChange?.(newSelectedItems.map(i => 
        typeof options[0] === 'string' ? i.label : i.value
      ))
      return newSelectedItems
    })
    setInputValue('')
    setIsOpen(false)
    setFilteredOptions(normalizedOptions.filter(option => 
      !selectedItems.some(selected => selected.value === option.value) &&
      option.value !== item.value
    ))
  }, [normalizedOptions, selectedItems, onSelectedItemsChange, options])

  const handleRemoveItem = useCallback((item: { value: string; label: string }) => {
    setSelectedItems(prev => {
      const newSelectedItems = prev.filter(i => i.value !== item.value)
      // Convert to string array before calling onSelectedItemsChange
      onSelectedItemsChange?.(newSelectedItems.map(i => 
        typeof options[0] === 'string' ? i.label : i.value
      ))
      return newSelectedItems
    })
    setFilteredOptions(prev => [...prev, item].sort((a, b) => a.label.localeCompare(b.label)))
  }, [onSelectedItemsChange, options])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex((prevIndex) => 
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
      )
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
    } else if (event.key === 'Enter' && highlightedIndex !== -1) {
      handleSelectItem(filteredOptions[highlightedIndex])
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }, [filteredOptions, highlightedIndex, handleSelectItem])

  const toggleOptions = useCallback(() => {
    setIsOpen((prev) => !prev)
    if (!isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="autocomplete-container">
      <div className="autocomplete-header">
        {selectedItems.map((item) => (
          <div key={item.value} className="autocomplete-badge">
            {item.label}
            <button
              onClick={() => handleRemoveItem(item)}
              className="remove-btn"
            >
              ×
            </button>
          </div>
        ))}
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedItems.length === 0 ? placeholder : ''}
            className="autocomplete-input"
            aria-autocomplete="list"
            aria-controls="autocomplete-list"
            aria-expanded={isOpen}
          />
        </div>
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleOptions}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? "▲" : "▼"}
        </button>
      </div>
      {isOpen && (
        <div className="autocomplete-dropdown">
          <ul id="autocomplete-list" role="listbox" className="autocomplete-list">
            {filteredOptions.map((item, index) => (
              <li
                key={item.value}
                role="option"
                aria-selected={index === highlightedIndex}
                onClick={() => handleSelectItem(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`autocomplete-item ${highlightedIndex === index ? 'highlighted' : ''}`}
              >
                {item.label}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="no-options">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
export default AutocompleteWithChips;