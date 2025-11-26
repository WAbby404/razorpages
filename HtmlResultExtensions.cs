using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Microsoft.AspNetCore.Http;

public static partial class HtmlResultsExtensions
{
    extension(Results)
    {
        public static RazorComponentResult Razor(RenderFragment fragment, int? statusCode = null, string? contentType = null)
        {
            // var fc = new ParametersDictionary(fragment);
            var rd = new ReadOnlyDictionary<string, object?>(
                new Dictionary<string, object?>
                {
                    { nameof(FragmentComponent.RenderFragment), fragment }
                });
                
            return new RazorComponentResult<FragmentComponent>(rd)
            {
                StatusCode = statusCode,
                ContentType = contentType,
                PreventStreamingRendering = true
            };
        }
    }
}

public class FragmentComponent : ComponentBase
{
    [Parameter]
    public required RenderFragment RenderFragment { get; set; }

    protected override void BuildRenderTree(RenderTreeBuilder builder)
    {
        builder.AddContent(0, RenderFragment);
    }
}

public readonly struct ParametersDictionary(in RenderFragment fragment)
        : IReadOnlyDictionary<string, object?>, IDictionary<string, object?>
    {
        private static readonly ICollection<string> _keys = [nameof(RenderFragment)];

        private readonly RenderFragment _fragment = fragment;

        public IEnumerable<string> Keys => _keys;
        public IEnumerable<object?> Values => throw new NotSupportedException();
        public object? this[string key] => key == nameof(RenderFragment) ? _fragment : null;
        public int Count => 1;

        ICollection<string> IDictionary<string, object?>.Keys => _keys;
        ICollection<object?> IDictionary<string, object?>.Values => throw new NotSupportedException();
        public bool IsReadOnly => true;

        object? IDictionary<string, object?>.this[string key]
        {
            get => this[key];
            set => throw new NotSupportedException();
        }

        public bool ContainsKey(string key) => key == nameof(RenderFragment);

        public IEnumerator<KeyValuePair<string, object?>> GetEnumerator()
        {
            yield return new(nameof(RenderFragment), _fragment);
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => GetEnumerator();

        public bool TryGetValue(string key, out object? value)
        {
            if (key == nameof(RenderFragment))
            {
                value = _fragment;
                return true;
            }
            value = null;
            return false;
        }

        public void Add(string key, object? value) => throw new NotSupportedException();

        public bool Remove(string key) => throw new NotSupportedException();

        public void Add(KeyValuePair<string, object?> item) => throw new NotSupportedException();

        public void Clear() => throw new NotSupportedException();

        public bool Contains(KeyValuePair<string, object?> item) => throw new NotSupportedException();

        public void CopyTo(KeyValuePair<string, object?>[] array, int arrayIndex) => throw new NotSupportedException();

        public bool Remove(KeyValuePair<string, object?> item) => throw new NotSupportedException();
    }