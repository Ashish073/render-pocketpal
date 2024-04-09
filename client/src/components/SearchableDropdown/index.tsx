import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { AnimatePresence, m } from 'framer-motion';

interface Option {
    label: string;
    value: string;
}

interface Props {
    id: string;
    name: string;
    value: string;
    options: Option[];
    label: string;
    placeholder?: string;
    onChange: (value: string) => void;
    clearInput: () => void;
}

const SearchableDropdown: React.FC<Props> = ({ options, id, name, value, clearInput, placeholder, label, onChange }) => {
    console.log(value);
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        onChange(value);
        filterOptions(value);
    };

    const filterOptions = (value: string) => {
        const filtered = options.filter((option) =>
            option.label.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered);
        setSelectedOptionIndex(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const currentIndex = selectedOptionIndex !== null ? selectedOptionIndex : -1;
            let nextIndex = currentIndex + (e.key === 'ArrowDown' ? 1 : -1);
            if (nextIndex < 0) nextIndex = filteredOptions.length - 1;
            if (nextIndex >= filteredOptions.length) nextIndex = 0;
            setSelectedOptionIndex(nextIndex);
        } else if (e.key === 'Enter' && selectedOptionIndex !== null) {
            handleSelectOption(filteredOptions[selectedOptionIndex]);
            if (inputRef.current) inputRef.current.blur();
        }
    };

    const handleSelectOption = (option: Option) => {
        onChange(option.label);
        setFilteredOptions(options);
        setSelectedOptionIndex(null);
    };

    const handleClearOption = () => {
        clearInput();
        onChange('');
        setFilteredOptions(options);
        setSelectedOptionIndex(null);
    };

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };



    const scrollToOption = (index: number) => {
        if (dropdownRef.current) {
            const listItem = dropdownRef.current.children[index] as HTMLElement;
            if (listItem) {
                listItem.scrollIntoView({ block: 'nearest' });
            }
        }
    };

    useEffect(() => {
        if (selectedOptionIndex !== null) {
            scrollToOption(selectedOptionIndex);
        }
    }, [selectedOptionIndex]);

    useEffect(() => {
        if (selectedOptionIndex !== null) {
            scrollToOption(selectedOptionIndex);
        }
    }, [value]);

    return (
        <div className="relative w-full">
            <div className='group flex justify-between items-end border-b group-focus:border-blue-500 focus:border-blue-500'>
                <div>
                    <label>{label}</label>
                    <input
                        id={id}
                        name={name}
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full py-2 dark:bg-inherit focus:outline-none outline-none"
                        ref={inputRef}
                    />
                </div>
                <button className={`mb-3 ${value ? 'visible' : 'invisible'}`} onClick={(e) => {
                    e.preventDefault(); handleClearOption()
                }}>
                    <IoMdClose />
                </button>
            </div>
            <AnimatePresence>
                {isFocused && (
                    <m.ul
                        initial={{
                            maxHeight: 0
                        }}
                        animate={{
                            maxHeight: 160
                        }}
                        exit={{
                            maxHeight: 0,
                            transition: {
                                duration: 0.05,
                                type: 'just'
                            }
                        }}
                        transition={{
                            duration: 0.3,
                            type: 'spring'
                        }}
                        ref={dropdownRef} className="absolute z-10 mt-1 w-full bg-white border border-gray-300 dark:bg-[#1c1f27] rounded-md shadow-lg overflow-auto">

                        {filteredOptions.length ? filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                onMouseDown={() => handleSelectOption(option)}
                                className={`cursor-pointer p-2 hover:bg-blue-400 hover:text-white dark:hover:bg-[#363c4d] ${selectedOptionIndex === index ? 'bg-blue-100 dark:bg-[#4b5563]' : ''}`}
                            >
                                {option.label}
                            </li>
                        )) : <li
                            className={`cursor-pointer p-2 dark:hover:bg-[#363c4d] bg-blue-100 dark:bg-[#4b5563]`}
                        >
                            No Option Found
                        </li>}
                    </m.ul>
                )}
            </AnimatePresence>
        </div>
    );
};


export default SearchableDropdown;
