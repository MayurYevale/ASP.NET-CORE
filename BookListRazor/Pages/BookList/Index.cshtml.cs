using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookListRazor.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace BookListRazor.Pages.BookList
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _db;

        public IndexModel(ApplicationDbContext db)
        {// here db is getting using Dependency injection
            _db = db;
        }

        // return list or IEnumerable of Book
        public IEnumerable<Book> Books { get; set; }

        public async Task OnGetAsync()
        {
            //adding books from _db to Books list inside OnGet handler
            Books = await _db.Book.ToListAsync();
        }
    }
}
