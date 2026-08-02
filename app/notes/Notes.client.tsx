"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData  } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedQuery] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedQuery],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedQuery }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong!</p>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
