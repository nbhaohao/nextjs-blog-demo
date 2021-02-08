import React from "react";
import Link from "next/link";
import _ from "lodash";

interface Options {
  page: number;
  pages: number;
  urlMaker?: (n: number) => string;
}

const usePager = (options: Options) => {
  const { page, pages, urlMaker } = options;
  const numbers = [];
  numbers.push(1);
  for (let i = page - 3; i <= page + 3; i++) {
    numbers.push(i);
  }
  numbers.push(pages);
  const pageNumbers = _.uniq(numbers)
    .sort((a, b) => a - b)
    .filter((n) => n >= 1 && n <= pages)
    .reduce((result, n) => {
      return n - (result[result.length - 1] || 0) === 1
        ? result.concat(n)
        : result.concat(-1, n);
    }, []);
  console.log("y", pageNumbers);
  const pager = (
    <div className="wrapper">
      {page !== 1 && (
        <Link href={urlMaker(page - 1)}>
          <a>上一页</a>
        </Link>
      )}
      {pageNumbers.map((n, index) =>
        n === -1 ? (
          <span key={index}>...</span>
        ) : (
          <Link key={index} href={urlMaker(n)}>
            <a>{n}</a>
          </Link>
        )
      )}
      {page !== pages && (
        <Link href={urlMaker(page + 1)}>
          <a>下一页</a>
        </Link>
      )}
      <span>
        第{page}/{pages}页
      </span>
      <style jsx>{`
        .wrapper {
          margin: 0 -8px;
        }
        .wrapper > a,
        .wrapper > span {
          margin: 0 8px;
        }
      `}</style>
    </div>
  );

  return { pager };
};

export { usePager };
