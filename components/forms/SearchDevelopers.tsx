"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CgSpinner, CgSearch } from "react-icons/cg";
import { useState, memo } from "react";
import { SearchDevValidation } from "@/lib/validations/searchdev";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { fetchSearchDev } from "@/lib/actions/user.actions";
import { Input } from "../ui/input";
import SearchedDevCard from "../cards/SearchedDevCard";

const SearchDevelopers = () => {
  const pathname = usePathname();
  const [loadSpin, setLoadSpin] = useState<boolean>(false);
  const [resultSearch, setResultSearch] = useState<any>([]);

  const form = useForm({
    resolver: zodResolver(SearchDevValidation),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SearchDevValidation>) => {
    setLoadSpin(true);

    const result = await fetchSearchDev(values.username);

    console.log(result);
    setResultSearch(result);

    setLoadSpin(false);
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-medium text-dark-4 text-xs sm:text-sm md:text-base">
                  Search developers by username
                </FormLabel>

                <div className="flex gap-1">
                  <FormControl>
                    <Input type="text" className="no-focus" {...field} />
                  </FormControl>

                  {!loadSpin && (
                    <Button className="bg-accent-1 hover:bg-accent-1_hover text-light-1 lex items-center gap-1 ">
                      Search <CgSearch size={20} />{" "}
                    </Button>
                  )}

                  {loadSpin && (
                    <Button className="flex items-center gap-1 bg-accent-1_hover cursor-default text-light-1 hover:bg-accent-1_hover px-4 py-2">
                      Search <CgSpinner size={20} className="animate-spin" />
                    </Button>
                  )}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="mt-5">
        {resultSearch.length > 0 ? (
          resultSearch.map((data: any) => (
            <SearchedDevCard userInfo={data} key={data._id} />
          ))
        ) : (
          <p className="text-center">No Results</p>
        )}
      </div>
    </div>
  );
};

export default SearchDevelopers;
